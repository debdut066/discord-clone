/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "uploadthing.com",
    //     port: "",
    //     pathname: "",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "utfs.io",
    //     port: "",
    //     pathname: "",
    //   },
    // ],
  },
};

module.exports = nextConfig;
