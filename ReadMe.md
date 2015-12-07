Aurelia Meets DocumentDB: A Matchmaker’s Journey Part 2  
December 2015 MSDN Magazine Data Points Column  
msdn.microsoft.com/en-us/magazine/mt595750  
by Julie Lerman  

This solution needs some TLC before you can use it. It will run on Windows and OSX. I have not tested it out on Linux.

Part is to create the Azure DocumentDB sample database in your Azure account.   
Another of the setup is to get the Aurelia & Node solution set up to run.

__Creating the Azure DocumentDB account:__  
You will need an Azure account. If you don't have one, there is a free monthly allotment that comes with an MSDN Subscription. If you don't have an MSDN subscription, you can get a one month trial here: https://azure.microsoft.com/en-us/pricing/free-trial/.

Follow the documentation to  
1) Create a Database Account (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-account/)  
2) Create a Database (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-database/)  
3) Create a Collection (https://azure.microsoft.com/en-us/documentation/articles/documentdb-create-collection/)  

__Modify the code to use the Azure DocumentDB__  
My configuration expects a database named Ninjas and a collection named Ninjas. But you can modify the config to reflect the names you chose.

4) Modify the config.js file in the root folder of the sample solution (shown below).  
5) Replace YOURDOCUMENTDBACCOUNTNAME with the name of your account.  
6) Replace THE MASTER KEY FOR YOUR DOCUMENTDB ACCOUNT with your key which can be found under "All Settings" and then "Keys" in the Azure portal info for your DocumentDB. You'll want the Primary key.  

   __config.js file contents__  
   var config = {}  
   config.host = process.env.HOST || "https://YOURDOCUMENTDBACCOUNTNAME.documents.azure.com:443/";  
   config.authKey = process.env.AUTH_KEY || "THE MASTER KEY FOR YOUR DOCUMENTDB ACCOUNT";  
   config.databaseId = "Ninjas";  
   config.collectionId = "Ninjas";  
   module.exports = config;  
    

7) Import the five json documents found in this download. Simple steps for this can be found in the documentation ("Document Explorer navigation options and advanced settings"), under the section "Bulk add documents with Document Explorer".    

__Requirements to run the Aurelia sample:__  
1) This requires that Node.JS is installed on your computer. Find that at nodejs.org.  
2) It also requires Git to be installed on your computer. Find that at git-scm.com.  

The zip file contains most of what you need but you will need to reinstall some APIs. Here is how:

In the root folder, run:  
3) npm install  
   Note: If you see a lot of WARN  and ERR! statements along the way, but the bulk of logging is normal, don't worry about them (like I used to).
 
In the public/app folder run these commands one at a time:  
4) npm install -g  
5) npm install -g gulp  
6) npm install -g jspm  
7) jspm install  

Note: jspm install may ask if you want to set up GitHub credentials. Here is why:  
   jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests.
   It is advised that you configure jspm with your GitHub credentials in order to avoid problems.
   You can do this by executing jspm registry config github and following the prompts.
   If you choose to authorize jspm by an access token instead of giving your password 
   (see GitHub Settings > Personal Access Tokens), public_repo access for the token is required.
I have pre-installed many of the jspm packages however and this should prevent you from reaching the limit. 
I did this so that you didn't feel forced to create your own github account. 

__Running the app:__

Once all of the installs are done, go to the root folder of the solution in CMD and type  
__gulp watch__

This will build and deploy the source and it will also open up the browser to the default page of the site which is localhost:7000/app. It will be on the Welcome page. Welcome, Github Users and Child Router are part of the skeleton app. The Ninjas option on the menu is what I added.
