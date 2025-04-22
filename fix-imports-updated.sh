#!/bin/bash

# Find all MDX files that import Callout from '../components/Callout'
find ./pages -type f -name "*.mdx" -exec grep -l "import { Callout } from '../components/Callout'" {} \; | while read -r file; do
  echo "Fixing imports in $file"
  # Replace the import statement with the correct one for Nextra 2.2.14
  sed -i '' "s/import { Callout } from '..\/components\/Callout'/import { Callout } from 'nextra-theme-docs'/g" "$file"
done

echo "Import fixes completed"
