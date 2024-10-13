# vue-builder-api

!! This is a work in progress !!

This is the API for vue-page-builder. It's a basic API to manage pages and components.

## Installation

```bash
git clone https://github.com/dmdboi/vue-builder-api.git
cd vue-builder-api
npm install
```

You will need to create a `.env` file in the root directory with the following variables:

```bash
MONGO_DB_URI=your_mongo_db_uri
```

## Usage

```bash
npm run dev
```

## Example Usage

Using the API, JSON data can be used to create dynamic pages and components. Below is an example of a JSON object that can be used to create a menu component.

### Input
```json
{
  "type": "component",
  "name": "menu",
  "content": [
    {
      "type": "div",
      "attributes": {
        "class": "blog-menu"
      },
      "content": [
        {
          "type": "ul",
          "content": [
            {
              "type": "li",
              "repeatable": "menu",
              "content": [
                {
                  "type": "a",
                  "content": [""],
                  "attributes": {
                    "href": "http://mysite.test/fruits/:value"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "data": {
    "menu": [
      {
        "key": "Apples",
        "value": "apples"
      },
      {
        "key": "Bananas",
        "value": "bananas"
      },
      {
        "key": "Oranges",
        "value": "oranges"
      },
      {
        "key": "Pears",
        "value": "pears"
      }
    ]
  }
}
```

### Output
```html
<div class="blog-menu">
  <ul>
    <li>
      <a href="http://mysite.test/fruits/apple">Apple</a>
    </li>
    <li>
      <a href="http://mysite.test/fruits/banana">Banana</a>
    </li>
    <li>
      <a href="http://mysite.test/fruits/orange">Orange</a>
    </li>
    <li>
      <a href="http://mysite.test/fruits/pear">Pear</a>
    </li>
  </ul>
</div>
```
