import {NextResponse, NextRequest} from "next/server";

export const GET = async (request: NextRequest) => {
    //houston is long=-95.358421&lat=29.749907
    const long = request.nextUrl.searchParams.get('long') || '-95.358421';
    const lat = request.nextUrl.searchParams.get('lat') || '29.749907';
    const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,showers,snowfall,snow_depth,relative_humidity_2m,precipitation_probability,precipitation,rain,weather_code&timezone=auto&forecast_days=1`)
    const weather = await resp.json();
    const hour = (new Date()).getHours(); // gets hours
    const hourly = weather.hourly
    const respJson = {
        temperature_2m:hourly.temperature_2m[hour],
        showers:hourly.showers[hour],
        snowfall:hourly.snowfall[hour],
        snow_depth:hourly.snow_depth[hour],
        relative_humidity_2m:hourly.relative_humidity_2m[hour],
        precipitation_probability:hourly.precipitation_probability[hour],
        precipitation:hourly.precipitation[hour],
        rain:hourly.rain[hour],
        weather_code:hourly.weather_code[hour],
    }
    return NextResponse.json({'weather': respJson});
}