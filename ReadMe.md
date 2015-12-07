Aurelia Meets DocumentDB: A Matchmaker’s Journey Part 2
December 2015 MSDN Magazine Data Points Column
msdn.microsoft.com/en-us/magazine/
Julie Lerman


This solution needs some TLC before you can use it.

Part is to create the Azure DocumentDB sample database in your Azure account. 
Another of the setup is to get the Aurelia & Node solution set up to run.


_______________________________________________________________________________
_______________________________________________________________________________
Creating the Azure DocumentDB account:
You will need an Azure account. If you don't have one, there is a free monthly allotment that comes with an MSDN Subscription. If you don't have an MSDN subscription, you can get a one month trial here: https://azure.microsoft.com/en-us/pricing/free-trial/.
Follow the documentation to 
*Create a Database Account (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-account/)
*then Create a Database (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-database/)
*and then Create a Collection (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-collection/)

My configuration expects a Databased named Ninjas and a collection named Ninjas. But you can modify the config to reflect the names you chose.

*Modify the config.js file in the root folder of the sample solution (shown below).
*Replace YOURDOCUMENTDBACCOUNTNAME with the name of your account.
*Replace THE MASTER KEY FOR YOUR DOCUMENTDB ACCOUNT with your key which can be found under "All Settings" and then "Keys" in the Azure portal info for your DocumentDB. You'll want the Primary key.

___config.js file contents______
var config = {}
config.host = process.env.HOST || "https://YOURDOCUMENTDBACCOUNTNAME.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "THE MASTER KEY FOR YOUR DOCUMENTDB ACCOUNT";
config.databaseId = "Ninjas";
config.collectionId = "Ninjas";
module.exports = config;
________________________________

*Import the five json documents found in this download. Simple steps for this can be found in the documentation ("Document Explorer navigation options and advanced settings"), under the section "Bulk add documents with Document Explorer".
 
_______________________________________________________________________________
_______________________________________________________________________________
Requirements to run the Aurelia sample:
This requires that Node.JS is installed on your computer. Find that at nodejs.org.
It also requires Git to be installed on your computer. Find that at git-scm.com.

The zip file contains most of what you need but you will need to reinstall some APIs. Here is how:

In the root folder:
*npm install
Note: If you see a lot of WARN  and ERR! statements along the way, but the bulk of logging is normal, don't worry about them (like I used to).
 

In the public/app folder run these commands one at a time:
*npm install -g
*npm install -g gulp
*npm install -g jspm
*jspm install

Note: jspm install may ask if you want to set up GitHub credentials. Here is why:
   jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests.
   It is advised that you configure jspm with your GitHub credentials in order to avoid problems.
   You can do this by executing jspm registry config github and following the prompts.
   If you choose to authorize jspm by an access token instead of giving your password 
   (see GitHub Settings > Personal Access Tokens), public_repo access for the token is required.
I have pre-installed many of the jspm packages however and this should prevent you from reaching the limit. 
I did this so that you didn't feel forced to create a github account.

_______________________________________________________________________________
_______________________________________________________________________________
Running the app:

Once all of the installs are done, go to the root folder of the solution in CMD and type 
*gulp watch

This will build and deploy the source and it will also open up the browser to the default page of the site which is localhost:7000/app. It will be on the Welcome page. Welcome, Github Users and Child Router are part of the skeleton app. The Ninjas option on the menu is what I added.


Julie Lerman
thedatafarm.com
twitter @julielerman