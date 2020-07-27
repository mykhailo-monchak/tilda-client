# Tilda API client for Node.js and browser

This is a Tilda API client for Node.js and browser written in Typescript.

## Installation

```shell
npm install tilda-client
```

or

```shell
yarn add tilda-client
```

## Simple Example

As demonstrated by this example, you can get a list of all projects and load detailed project data. The detailed project object contains **CSS** and **JS** data.

And also you can get a list of all pages in the project and load complete page data per each of them. The detailed page object contains **HTML** of the page.

```typescript
import { TildaClient, TildaProject, TildaProjectData, TildaPage, TildaPageData } from 'tilda-client';

...

const tilda = new TildaClient(config.TILDA_PUBLIC_KEY, config.TILDA_SECRET_KEY);

const projects: TildaProject[] = await tilda.getProjectsList();
console.log(`${projects.length} projects have been loaded.`);

for (const p of projects) {
    const project: TildaProjectData = await tilda.getProject(p.id);
    console.log(`${project.title} project has been loaded.`);

    const pages: TildaPage[] = await tilda.getPagesList(p.id);
    console.log(`${pages.length} pages have been loaded.`);

    for (const pg of pages) {
        const page: TildaPageData = await tilda.getPage(pg.id);
        console.log(`${page.title} page has been loaded.`);
    }
}
```

## Configuration

You can get public and secret keys in your Tilda account <a href="https://tilda.cc/identity/apikeys/" target="_blank">here</a>.

Please read <a href="https://help.tilda.ws/api/" target="_blank">Tilda API documentation</a> and pay attention that there is a limit to the number of requests as **150 per hour**.

## Need Help?

Drop me an email to [Mikhail Monchak](mailto:mikhail.monchak.work@gmail.com)
