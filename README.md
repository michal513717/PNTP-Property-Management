# Property Maintenance Request System

A backend service for managing property maintenance requests with automatic priority classification based on message content.

## Setup

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB


## Features

- Analyze maintenance messages for urgency and priority
- Create new maintenance requests with automatic classification
- Retrieve requests filtered by priority level
- Input validation using `express-validator`
- MongoDB integration with Mongoose
- Optional use of OpenAI (ChatGPT) for message analysis

---

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/michal513717/PNTP-Property-Management.git
    cd PNTP-Property-Management
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables
    ```env
    MONGODB_URI = Your mongo db uri
    MONGODB_DB_NAME = Database name
    CHAT_GTP_KEY=your-openai-key (optional)
    ```

4. Start the server
    ```bash
    npm run dev
    ```

## API

### Analzyer

- `POST /analyze` - Analyze service
    - **Fields:** 
        - `message` (string, required)
    - **Response:**
        - Keywords - string
        - Urgency Indicators - string - Reason
        - Priority Score - enum - LOW, MEDIUM, HIGH
- `POST /requests` - Create a new maintenance request
    - **Fields:** 
        - `tenantId` (string, required) 
        - `message` (string, required) 
        - `timestamp` (string, required) 
    - **Response:**
        - Request ID - string
        - Priority - enum - LOW, MEDIUM, HIGH
        - Analzyed Factors - object with keywords and reason

### Repository


- `GET /requests` - Get a requests filtered by priority
    - **Fields:**
        - `?priority` (LOW, MEDIUM, HIGH)
    - **Response:**
        - id - string
        - Priority - enum - LOW, MEDIUM, HIGH
        - Message - string - original message
        - createdAt- Date
        - resolved - boolean - status
    

## Validation

Implemented input validation for all endpoints using `express-validator`.

## Priority Calculation Logic

The system uses two alternative analyzers:

1. Keyword-Based Analysis (default)

Priorities are determined by scanning messages for specific terms:
```
if (message includes term from HIGH_PRIORITY_TERMS) → HIGH
else if (message includes term from MEDIUM_PRIORITY_TERMS) → MEDIUM
else → LOW
```

Each term can have an associated explanation (reason) and can be chaned in utils file (priority levels). Example:

```
{ term: 'gas leak', reason: 'Potential explosion hazard' }
```

2. ChatGPT-Based Analysis (optional)

If a valid OpenAI key is configured, analyze() will send the message to GPT-3.5 and parse its structured response.

## Error Handling

- Implemented proper error handling for cases such as invalid input, resource not found, and server errors.
- Returns appropriate HTTP status codes and error messages.

## Technology Stack

- Node.js
- Express.js
- MongoDB (mongoose)
- TypeScript
- `express-validator` for validation
- log4js for logging