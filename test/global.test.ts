/* eslint @typescript-eslint/no-unused-vars: 0 */

import { TildaClient } from '../src/tilda.client';
import * as dotenv from 'dotenv';

async function test() {
  dotenv.config();

  const client = new TildaClient(process.env.TEST_PUBLIC_KEY, process.env.TEST_SECRET_KEY);

  const projectsList = await client.getProjectsList();
  const project = await client.getProject(projectsList[0].id);
  const projectExport = await client.getProjectExport(projectsList[0].id);

  const pagesList = await client.getPagesList(projectsList[0].id);
  const page = await client.getPage(pagesList[0].id);
  const pageFull = await client.getPageFull(pagesList[0].id);
  const pageExport = await client.getPageExport(pagesList[0].id);
  const pageFullExport = await client.getPageFullExport(pagesList[0].id);

  console.log('tested');
}

test();
