# Foo Clinical

This is a sample EHR-like application using Medplum. Medplum is a developer platform for medical apps.

## Getting Started

First, install all the packages

```javascript
npm install
```

Next, run the app

```javascript
npm run dev
```

This app should run on `http://localhost:3000/`

### Vercel
We will be using Vercel to set up a build view of the application. Go to `vercel.com`, where you will need to create an account if you do not already have one. 

Once you have an account, click on the `+ New Project` button. Choose the `foo-clinical` repository from the drop down. It should appear in your list. 

Click on the `Import` button, which will bring you to a new page where you can change details of your project. Change your name to whatever you would like. Your framework preset should be set to `Vite` as a default, but please select that if it is not. Everything else can be left as its default. Click on the `Deploy` button. 

Vercel should now start deploying your application. This may take a few minutes, but once it is finished click the `Go to Dashboard` button. This will bring you to the dashboard, where you can see previews or visit the domain generated for your website.

### SonarSource
SonarCloud is a service that will automatically check your code for coverage, bugs, and security issues. To implement it, go to `sonarcloud.io`. You will need to create an account if you do not already have one. 

Once your account is created, click on the `Analyze new project` button, then the `Import new organization from Github` button. You will then need to choose your Github organization that you forked `foo-clinical` to. Your forked repo will need to be public so that you can access the free version of SonarCloud for open source projects. In the `Repository Access` section, select `only select repositories` and choose `foo-clinical`. Click `save`.

Create a new SonarCloud organization to import your repository to. The only necessary field is to give it a new name. Click `Continue`. Choose the free plan, and click `Create Organization`.

On the next page, choose your repo and click the `Set Up` button. This should begin the analysis of your project, which may take a minute. Once your analysis is available, hover over `Administration` in the menu on the left hand side of the screen and select `New Code`. Here you can select how often your code is analyzed. `Previous Version` is recommended. 
