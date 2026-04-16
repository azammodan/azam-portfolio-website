#!/bin/bash
set -e

echo "Building Next.js static export..."
npm run build

echo "Static export completed successfully"
echo "Output directory: out/"
ls -la out/