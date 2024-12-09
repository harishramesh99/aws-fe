import type { NextConfig } from "next";
import Joi from 'joi';

const configSchema = Joi.object({
  output: Joi.string().valid('export').required(),
  images: Joi.object({
    unoptimized: Joi.boolean().required()
  }).required()
});

const nextConfig: NextConfig = {
  output: 'export',  // This enables static HTML export
  images: {
    unoptimized: true  // Required for static export
  }
}

// Validate the configuration
const { error } = configSchema.validate(nextConfig);
if (error) {
  throw new Error(`Invalid Next.js configuration: ${error.message}`);
}

export default nextConfig;