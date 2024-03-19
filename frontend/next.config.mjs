/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return {
		  beforeFiles: [
			// These rewrites are checked after headers/redirects
			// and before all files including _next/public files which
			// allows overriding page files
			{
				source: '/api/:path*',
				destination: `http://localhost:8080/:path*`,
			},
		  ]
		}
	}

};

export default nextConfig;
