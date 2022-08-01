export default function middleware(req) {
  console.log(req.geo.city)
  console.log(req.headers.get("x-vercel-up-city"))
  req.setHeader("x-vercel-up-city", req.geo.city)
  req.setHeader("x-vercel-up-country", req.geo.country)
  req.setHeader("x-vercel-up-timezone", req.geo.timezone)
  req.setHeader("x-vercel-up-latitude", req.geo.latitude)
  req.setHeader("x-vercel-up-longitude", req.geo.longitude)
  req.setHeader("x-vercel-up-ip", req.ip)
  req.setHeader("x-vercel-up-tor", req.tor)
  req.setHeader("x-vercel-up-fingerprint", req.fingerprint)
}
