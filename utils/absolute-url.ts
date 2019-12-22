import { IncomingMessage } from "http";

const absoluteUrl = (
  req: IncomingMessage | undefined,
  setLocalhost: string
) => {
  var protocol = "https:";
  var host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host && host.includes("localhost")) {
    if (setLocalhost) {
      host = setLocalhost;
    }
    protocol = "http:";
  }

  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host
  };
};

export default absoluteUrl;
