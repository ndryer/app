import { UserData } from './types';

// Profile photo will be saved and referenced locally
export const userData: UserData = {
  fullName: "Nathan Dryer",
  bioLine: "I'm a AI/ML Builder & Product Manager",
  photoUrl: "/profile.jpg", // We'll save this image from the provided photo
  experiences: [
    {
      title: "Senior Product Manager",
      company: "ForeSee",
      location: "San Francisco, CA",
      dates: "April 2017 - Present",
      blurb: [
        "Built new user management tools from scratch for the Enterprise Suite Platform, reducing support costs by allowing clients to fully self-serve user populations",
        "Built new Feedback collection tools for clients, providing more dynamic methodologies for collecting user feedback on clients' websites",
        "Led cross-functional effort to overhaul and replace Survey Builder platform within the Enterprise Suite Platform, while using Google Design Sprint methodologies",
        "Product Manager for Alerts framework, Survey Builder, and User Management tool within Enterprise platform"
      ]
    },
    {
      title: "Product Manager",
      company: "McKesson Corp. (RelayHealth)",
      location: "San Francisco, CA",
      dates: "Jan 2015 - April 2017",
      blurb: [
        "Defined roadmap for a $40M healthcare management product lines",
        "New product features helped grow user base by 35% from 4.1 to 5.5M in a 1 year period",
        "Own development of product strategy of next generation healthcare data exchange framework",
        "Led usability testing of desktop and mobile management apps, which led to a ~$1M decrease in supportability costs, 5% increase in site registrations, and overall improved usability",
        "Built big data visualizations using TIBCO Spotfire to understand how market segmentation impacts conversion of patients to Patient Portal apps"
      ]
    },
    {
      title: "Sr. Business Analyst",
      company: "Fifth Third Bank (Corporate, Digital Delivery Team)",
      location: "Cincinnati, Ohio",
      dates: "2011 - 2015",
      blurb: [
        "Defined digital product requirements and functional specs with business partners",
        "Led the functional design of 5/3's first apps, mobile websites, and mobile deposit functionality",
        "Launched an Agile project management foundation to support mobile software development",
        "Increased mobile user base 2000% from 20K to 400K between 2011 to 2014",
        "Mobile deposits grew to represent over 10% of bank deposits ($100 million/month) in 3 years"
      ]
    },
    {
      title: "IT Leader Rotational Program",
      company: "Fifth Third Bank (Corporate, Digital Delivery Team)",
      location: "Cincinnati, Ohio",
      dates: "2009 - 2011",
      blurb: [
        "Completed 2-year leadership rotational program, rotating into a new role every 6 months, including: Product Manager, Business Analysis, and Project Management"
      ]
    }
  ],
  skills: [
    { name: "AI/ML Product Development" },
    { name: "Product Management" },
    { name: "User Experience Design" },
    { name: "Data Analysis" },
    { name: "Agile Methodologies" },
    { name: "JIRA" },
    { name: "Google Design Sprint" },
    { name: "Prototyping Tools" }
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/nathan-dryer" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nathandryer" },
    { name: "Personal Site", url: "https://nathandryer.com" }
  ],
  email: "dryer.nathan@gmail.com",
  phone: "(513) 448-5603",
  location: "San Francisco, California"
};
