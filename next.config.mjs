/** @type {import('next').NextConfig} */
const nextConfig = {

    transpilePackages: ['@react-three/drei', '@react-three/fiber', 'three'],
    images: {
        unoptimized: true
    },
};

export default nextConfig;
