#!/bin/bash

# Find all MDX files that import Callout from nextra/components
find ./pages -type f -name "*.mdx" -exec grep -l "import { Callout } from 'nextra/components'" {} \; | while read -r file; do
  echo "Fixing imports in $file"
  # Replace the import statement
  sed -i '' "s/import { Callout } from 'nextra\/components'/import { Callout } from '..\/..\/..\/components\/Callout'/g" "$file"
  # Handle files at different directory depths
  sed -i '' "s/import { Callout } from '..\/..\/..\/components\/Callout'/import { Callout } from '..\/..\/components\/Callout'/g" "$file"
  sed -i '' "s/import { Callout } from '..\/..\/components\/Callout'/import { Callout } from '..\/components\/Callout'/g" "$file"
done

echo "Import fixes completed"
