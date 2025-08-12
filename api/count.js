export async function GET(request) {
  const response = await fetch(
    "https://stats.tbc.tools/api/v1/vegas-loop-stats",
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const results = await response.json();
  return Response.json(results);
}
