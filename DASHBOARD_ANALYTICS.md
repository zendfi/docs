# Dashboard Analytics Implementation

## Overview

Added real-time analytics charts to the merchant dashboard's Overview tab, providing visual insights into payment activity, transaction volume, API usage, and success rates.

## Features Added

### 1. Time-Series Charts (Last 30 Days)

#### **Confirmed Transactions Chart**
- Line chart showing daily confirmed transaction count
- Color: Purple (#635bff) - matches ZendFi brand
- Filled area for better visibility
- Smooth tension curve for cleaner look

#### **Transaction Volume Chart**
- Bar chart displaying daily USD volume
- Color: Green (#10b981) - represents money/success
- Y-axis formatted with dollar signs
- Tooltip shows precise dollar amounts

#### **API Calls Chart**
- Line chart tracking daily API request count
- Color: Amber (#f59e0b) - represents activity/engagement
- Based on idempotency keys as proxy for API usage
- Helps monitor integration health

#### **Success Rate Chart**
- Line chart showing daily payment success percentage
- Color: Purple (#8b5cf6) - represents quality metrics
- Y-axis capped at 100% with percentage labels
- Helps identify payment processing issues

## Technical Implementation

### Backend Endpoint

**Route**: `GET /dashboard/analytics`

**Authentication**: Requires merchant JWT token (via cookie)

**Response Format**:
```json
{
  "payments_chart": [
    { "date": "2024-01-15", "value": 12.0 }
  ],
  "volume_chart": [
    { "date": "2024-01-15", "value": 3450.50 }
  ],
  "api_calls_chart": [
    { "date": "2024-01-15", "value": 89.0 }
  ],
  "success_rate_chart": [
    { "date": "2024-01-15", "value": 95.5 }
  ]
}
```

### Database Queries

All queries filter by:
- `merchant_id` (from JWT claims)
- `mode = 'live'` (excludes test data)
- Last 30 days time window
- Grouped by date for time-series

**Payments Query**:
```sql
SELECT 
    DATE(created_at) as date,
    COUNT(*) as count
FROM payments
WHERE merchant_id = $1 
  AND mode = 'live'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date ASC
```

**Volume Query** (confirmed payments only):
```sql
SELECT 
    DATE(created_at) as date,
    COALESCE(SUM(amount_usd), 0.0) as total
FROM payments
WHERE merchant_id = $1 
  AND mode = 'live'
  AND status = 'confirmed'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
```

**API Calls Query** (uses idempotency_keys as proxy):
```sql
SELECT 
    DATE(created_at) as date,
    COUNT(*) as count
FROM idempotency_keys
WHERE merchant_id = $1 
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
```

**Success Rate Query**:
```sql
SELECT 
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE status = 'confirmed') * 100.0 / NULLIF(COUNT(*), 0) as success_rate
FROM payments
WHERE merchant_id = $1 
  AND mode = 'live'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
```

### Frontend Implementation

**Library**: Chart.js v4.4.0 (CDN)

**Chart Configuration**:
- Font: Inter (matches dashboard design)
- Responsive: true (maintains aspect ratio 3:1)
- Tooltips: Dark background (#0A2540) with ZendFi branding
- Colors: Consistent with ZendFi brand palette
- Animations: Smooth transitions enabled

**Initialization**:
- Charts load on page load (DOMContentLoaded)
- Fetches data from `/dashboard/analytics`
- Only initializes on desktop devices (mobile shows desktop-only warning)
- Error handling for failed data fetches

## Files Modified

1. **src/merchant_dashboard.rs**
   - Added `get_dashboard_analytics()` handler function
   - Added chart container HTML in overview tab
   - Added Chart.js CDN script tag in `<head>`
   - Added `initializeCharts()` JavaScript function
   - Added Chart.js initialization code

2. **src/main.rs**
   - Added route: `/dashboard/analytics` → `merchant_dashboard::get_dashboard_analytics`

## User Experience

### Visual Design
- Charts use card-based layout with subtle shadows
- Section heading: "Analytics" with consistent typography
- Each chart has descriptive title above it
- Responsive grid layout (stacks on smaller screens)
- 24px gap between charts for breathing room

### Interaction
- Hover over data points to see precise values
- Tooltips styled with ZendFi dark theme
- Charts animate on load for polish
- No loading spinner needed (fast queries)

### Performance
- Queries use indexed columns (merchant_id, created_at, mode)
- 30-day window keeps result sets small
- Charts use client-side rendering (no server load)
- Data cached by browser until page refresh

## Future Enhancements

Potential improvements:
1. **Time Range Selector**: Allow 7/30/90 day views
2. **Export Data**: Download CSV of chart data
3. **Real-Time Updates**: WebSocket for live chart updates
4. **Comparison Views**: Compare test vs live mode
5. **Token Breakdown**: Volume by token (USDC, SOL, USDT)
6. **Geographic Data**: If location tracking added
7. **Conversion Funnel**: Payment intent → confirmed rate
8. **Agent Analytics**: Tie into existing `/api/v1/analytics/agents` data

## Testing

To verify implementation:

```bash
# 1. Start the server
cargo run

# 2. Login to merchant dashboard
# Navigate to: http://localhost:3000/dashboard

# 3. Verify Overview tab shows:
#    - Stats grid (Total Payments, Volume, Confirmed, Pending)
#    - "Analytics" section below stats
#    - 4 charts: Transactions, Volume, API Calls, Success Rate

# 4. Check browser console for:
#    - Successful fetch to /dashboard/analytics
#    - No JavaScript errors
#    - Chart initialization logs

# 5. Verify charts display real data:
#    - Hover over data points
#    - Check tooltips work
#    - Verify date labels on X-axis
#    - Confirm Y-axis formatting ($, %, counts)
```

## Notes

- Charts only show **live mode** data (test transactions excluded)
- Empty charts expected for new merchants with no transactions
- API calls metric based on idempotency keys (not perfect, but good proxy)
- Success rate calculated per day (not cumulative)
- All timestamps use merchant's database timezone
