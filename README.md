# GRADUATION THESIS: BKPhone – Mobile Retail Shopping Website

*Student: Dang Van Long
Studen ID: 20138681*

## Technologies & Libraries Used:

 -  NodeJS: [https://nodejs.org](https://nodejs.org/) ReactJS:
 -  [https://reactjs.org/](https://reactjs.org/) MongoDB:
 -  [https://www.mongodb.com/](https://www.mongodb.com/) Ant.Design:
 -  [https://ant.design/](https://ant.design/) Momo:
 -  [https://developers.momo.vn/](https://developers.momo.vn/) Stripe:
 -  [https://stripe.com/docs](https://stripe.com/docs)


## Installation

The system is deployed on a VPS (Virtual Private Server) using Cloud Computing, provided by Vultr, running the OS Centos 7 & Nginx to deploy the system.

The specs of the VPS:

- CPU: 1 core
- Memory: 1024MB
- Operating System: Centos 7
    
**Deployment steps:**
1.  Connect to the VPS by using Terminal on Mac/Linux or putty on Windows, enter the password when asked.
    ssh root@ip -p portnumber
2.  Install the EPEL (Extra Packages for Enterprise Linux)
sudo yum install epel-release
3.  Install nginx and allow it to run at the startup
sudo yum install -y nginx  
sudo systemctl enable nginx && sudo systemctl start nginx
4. Install NodeJS and NPM

    sudo curl -sL https://rpm.nodesource.com/setup | sudo bash -  
    sudo yum install -y nodejs  
    sudo yum install -y gcc-c++ make
5.  Install git
 

sudo yum install -y git 

6.  Pull the code from Github to the VPS:
    
cd /home && git clone https://github.com/longdang95/Do-An-BK
    
7.  Navigate to the source code folder:
    
 

cd /home/Do-An-BK 
    

8.  Run this command to install npm modules and dependencies to arbitrary places from code:
    
npm install
    
9.  And finally to bundle the code and start the server, use the command
    
gulp dev
