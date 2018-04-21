# Grass (GRep sASS)

Tool to get file and line using the css rule. When debugging css is difficult to get the css query and find in scss file.
With this tool you will find easy.

## Installation

```bash
$ npm i -g grass
```

## Usage

Create a scss file in a folder (ex: product.scss).

```scss
.product {
  &__title {
    color: #f00;

    &--active {
      color: #0f0;
    }
  }
}
```

Now run:

```bash
$ grass .product__title--active
```

You will see:

```bash
Searching in: **/*.scss

path/to/product.scss
6:    &--active {
```

## Change searcher

The default search is a glob `**/*.scss`, but is possible to search with another glob using the code:

```bash
$ grass .product__title--active -f stylesheets/**.scss
```
