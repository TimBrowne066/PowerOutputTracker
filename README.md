# Power Output Tracker
## A pure JavaScript data visualazation exercise

## To start the application:
- ```npm install```
- ```npm start```

## To select predefined time ranges:
- Below the graph, click on the desired predefined time frame key (Entire Run, Best 20, 15, 10, 5, or 1 minute periods) in the legend to see the line plotted on the graph and the route plotted on the map.  
- You can deselect any of the ranges by clicking again on the key in the legend.
- You can layer as many or few of the ranges simultaneously on the graph and map.

## To select a custom time range:
- You may click and drag to select any portion of the graph to select and highlight a custom range of data.
- The map will dynamically update with your custom data range upon making your selection.
- To deselect the custom range from the graph and map, simply click on the reset button at the top right of the graph.










# Original Readme Below:

# Peaksware Javascript Code Test

Please build a single page application to visualize the workout data provided in `workout-data.json`, including a map, a graph, and an algorithm to analyze average power output.

## Algorithm
- Write the most efficient method that finds the "best" 20 minute power effort.
- "Best" is defined as highest continuous average for the given time period.

## User Interface
- Display the gps path on a Map
- Display the power output over time on a graph, using time as the X axis
- When user selects a range of time on the graph, highlight the corresponding range on the map
- Display the 1, 5, 10, 15, and 20 minute "best" efforts

## Hints
The purpose of this test is to demonstrate your understanding of JavaScript web application patterns and best practices, efficient algorithms, and general clean coding habits. We realize this interview question can be a substantial task. To save time, do not focus too much on CSS styling, layouts, boundary use cases, etc. You are free to use whatever frameworks and libraries you like.

## Submission
Please submit your test as an emailed zip file (please do not include the node_modules folder) or link to a private repo or private file sharing system. You can also provide a hosted link or it can run locally.
