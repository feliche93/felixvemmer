-- Custom SQL migration file, put your code below! --
INSERT INTO "node_categories" ("name", "description")
VALUES (
        'Action in an app',
        'Do something in an app or service like Google Sheets, Telegram or Notion'
    ),
    (
        'Data transformation',
        'Manipulate, filter or convert data'
    ),
    ('Flow', 'Branch, merge or loop the flow, etc.'),
    (
        'Core',
        'Run code, make HTTP requests, set webhooks, etc.'
    ),
    (
        'Advanced AI',
        'Build autonomous agents, summarize or search documents, etc.'
    ),
    (
        'Trigger',
        'Triggers start your workflow. Workflows can have multiple triggers.'
    );