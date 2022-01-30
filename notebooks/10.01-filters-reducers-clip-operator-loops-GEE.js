/*
----------------------------------------------------------------------------

---------- Working with Vector and Raster data collections in GEE ----------

Topics covered:
1) Filters
2) Reducers
3) Clipping
4) Operators
5) For-Loops (Map Function) in GEE

----------------------------------------------------------------------------
*/



//---------------------------------------------------------------------------
// 1) Filtering the data collection
// 1.1) Filtering a feature from feature collection

// Load US Census Counties 2018 boundary layer
// available at: https://developers.google.com/earth-engine/datasets/catalog/TIGER_2018_Counties
var us_shp = ee.FeatureCollection('TIGER/2018/Counties');
Map.addLayer(us_shp, {}, 'US States Boundaries', false);

// But first prepare a dictionary containing visualization parameters for Fairfax city boundary
var fairfax_shp_vis = {
  fillColor: 'b5ffb4',
  color: 'FF6833',
  width: 1.0,
};
// Now filtering the Fairfax city boundary based on metadata, to visualize only FairFax
var fairfax_shp = us_shp.filterMetadata('NAMELSAD', 'equals', 'Fairfax city');
Map.addLayer(fairfax_shp, fairfax_shp_vis, 'fairfax city boundary', false);
Map.centerObject(fairfax_shp, 13);
// More Filtering Feature Collection examples available at: 
// https://developers.google.com/earth-engine/guides/feature_collection_filtering
//--------------------------------------------------------------------------




// --------------------------------------------------------------------------
// 1.2) Filtering an Image from Image collection

// In this example we will be using sentinel 2 data
var s2_data = ee.ImageCollection('COPERNICUS/S2_SR');

// first type of filter (By Date)
var s2_data = s2_data.filter(ee.Filter.date('2021-06-01', '2021-08-31'));

// Second type of filter (Filter by area of interest)
var s2_data = s2_data.filterBounds(fairfax_shp);


// Applying preprocessing
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}


var s2_data = s2_data.map(maskS2clouds); // dont worry about .map() function, well cover it later in For-Loops section

// Now by printing the filtered data, we'll see how many tiles of Sentinel-2 are present for fairfax in three months
print('Total Sentinel-2 Images Available:', s2_data.size()); //(see in console, nearly 72 images are available)
// You can also print just s2_data to see all metadata properties of 72 images
// --------------------------------------------------------------------------



// ----------------------------------------------------------------------


/*

2) Reducers:

Background:
When writing parallel computing code, a Reduce operation allows you to compute statistics on a large amount of inputs.
In Earth Engine, you need to run reduction operation when creating composites, calculating statistics, doing 
regression analysis etc. The Earth Engine API comes with a large number of built-in reducer functions 
(such as ee.Reducer.sum(), ee.Reducer.histogram(), ee.Reducer.linearFit() etc.) that can perform a variety of 
statistical operations on input data. You can run reducers using the reduce() function. Earth Engine supports 
running reducers on all data structures that can hold multiple values, such as Images (reducers run on different bands), 
ImageCollection, FeatureCollection, List, Dictionary etc.
*/

// Next we'll find middle pixel values for month of June-July-August using mean reducer
// by using either mean or median we will be able to get composite single image form our image collection of 72 images
// this step is used to ensure best pixel converage and also to make composite/mosaic of images
var s2_m = s2_data.median(); // this will take middle value for each pixel in 72 images

// Now if we print the mean_s2 data, it will show only one image because now we have applied mean reducer
print('Average Sentinel-2 Image: ', s2_m);

// Now we'll visualize the median image over fairfax
//Defining sentinel-2 visualization parameters
var s2_vis = {
  
  "bands":["B4","B3","B2"],
  "min": 0.026,
  "max": 0.318
  
};
// Adding Sentinel-2 (Median Image) Image over map
Map.addLayer(s2_m, s2_vis, 'S2 Full Images (Median)', false);

// ----------------------------------------------------------------------

/*
3) Clipping
It is often desirable to clip the images to your area of interest. 
You can use the clip() function to crop an image using a geometry.

NOTE:
While in a Desktop software, clipping is desirable to remove unnecessary portion 
of a large image and save computation time, in Earth Engine clipping can actually 
increase the computation time. As described in the Earth Engine Coding Best Practices 
guide, avoid clipping the images or do it at the end of your script.
*/

// Clipping the Sentinel-2 over Fairfox shp (earlier filtered)
var s2_clip = s2_m.clip(fairfax_shp);

// Visualize the clipped image
Map.addLayer(s2_clip, s2_vis, 'Clipped S2 Image', false);

// ----------------------------------------------------------------------

/*
4) Operators

Just like in Python, mathematical operations such as divide, multiply, add, 
substract, square, etc can be done in GEE using various methods
Below we'll evaluate NDVI using operators

*/

// For applying any mathematical operation over an image we,ll use image.expression('expression', {})

var s2_ndvi = s2_clip.expression(
  '((NIR - RED) / (NIR + RED))', {
    'NIR': s2_clip.select('B8'),
    'RED': s2_clip.select('B4')
  });
// Note: This (evaluating NDVI of an imnage) can also be performed using simple
// formula provided by GEE which is image.normalizedDifference(['NIR-Band', 'RED-Band'])
// Defining NDVI visualization
var s2_ndvi_vis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// Visualizing NDVI over map
Map.addLayer(s2_ndvi, s2_ndvi_vis, "S2 NDVI", false);

// ----------------------------------------------------------------------

/*
5) Loops in GEE

Just like Python (For-loops), GEE  support ilterating over data using a 
function called .map() over feature/image collection.

In case of feature/image collection, we first define a dictionary ourself and
then map it over whole image collection
Whereas in case of single feature or image, we directly apply the loop

Examples of both scenearios are given below:

*/
// ---- First Method ----
// Here we'll apply NDVI function over all 72 sentinel images 
// individually between june-august-2021 (s2_data)
// Thus in the end, all 72 images will contain an extra band named "ndvi"


// First defining the function to map later
// This function will add an extra bad named "ndvi" in each image of our image collection
// Additionally we can forward the clipping command to each image (this will use much larger processing power of GEE)
//
function S2NDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi').clip(fairfax_shp);
  return image.addBands(ndvi);
}

// Now once we define a dictionary based function, we can easily map it over large image collection
var s2_ndvi_all = s2_data.map(S2NDVI);

// Now if we print and see the properties of each image, there will be an extra added
// band named "ndvi"

print('NDVI added band in all images: ', s2_ndvi_all); // See 23rd band in console of each image

// We can also visualize any image from previous 72 images using system index ID
// Selecting random 32th image with its band "ndvi"
var s2_ndvi_test = s2_ndvi_all.filterMetadata("system:index", "equals", "20210712T155819_20210712T160546_T18STJ")
                              .select('ndvi');
// Adding the random selected test NDVI image from Image Collection
Map.addLayer(s2_ndvi_test, s2_ndvi_vis, "Mapped S2 image containing NDVI", false);
