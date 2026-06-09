export function isPrivateOrLocalUrl(src: string): boolean {
  try {
    const u = new URL(src);
    const host = u.hostname.toLowerCase();
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      // 172.16.0.0 – 172.31.255.255
      (host.startsWith("172.") &&
        (() => {
          const second = Number(host.split(".")[1]);
          return Number.isFinite(second) && second >= 16 && second <= 31;
        })())
    );
  } catch {
    return false;
  }
}

