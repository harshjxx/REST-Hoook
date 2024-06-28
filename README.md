
REST Hook Integration
==========================

This is a Node.js application that provides webhook integration for REST Hook. It allows subscribing, unsubscribing, and triggering events through webhooks.

Requirements
------------

- Node.js v20
- MongoDB Atlas
- npm

Setup
-----

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

   Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your actual MongoDB Atlas credentials.

4. Run the application:

   ```bash
   npm start
   ```

   The server will start on the port specified in the `.env` file (default is 3000).

API Endpoints
-------------

### Subscribe to Webhook

- **URL:** `/webhook/subscribe`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "targetUrl": "http://example.com/webhook"
  }
  ```
- **Success Response:**
  ```json
  {
    "id": "<webhook_id>",
    "targetUrl": "http://example.com/webhook",
    "message": "Subscription successful"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "targetUrl is required"
  }
  ```

### Unsubscribe from Webhook

- **URL:** `/webhook/unsubscribe`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "id": "<webhook_id>"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Unsubscription successful"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "id is required"
  }
  ```

### Trigger Event

- **URL:** `/webhook/trigger`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "message": "Event triggered to all webhooks"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Error fetching webhooks"
  }
  ```

Testing with Postman
--------------------

You can use the provided Postman collection to test the endpoints.

Postman Collection
------------------

```json
{
  "info": {
    "name": "Zapier Webhook Integration",
    "_postman_id": "c8e1e3c4-8344-4d75-9df4-4d4c9bdf2f4a",
    "description": "Collection for testing Zapier webhook integration endpoints.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Subscribe to Webhook",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{
    "targetUrl": "http://example.com/webhook"
}"
        },
        "url": {
          "raw": "http://localhost:3000/webhook/subscribe",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "webhook",
            "subscribe"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Unsubscribe from Webhook",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{
    "id": "<webhook_id>"
}"
        },
        "url": {
          "raw": "http://localhost:3000/webhook/unsubscribe",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "webhook",
            "unsubscribe"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Trigger Event",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/webhook/trigger",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "webhook",
            "trigger"
          ]
        }
      },
      "response": []
    }
  ]
}
```
