A Gentle Introduction to Satellite Image Processing
===================================================

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/edwardoughton/satellite-image-analysis/HEAD)

Welcome to this introductory course on `Satellite Image Analysis`!

Satellite imagery has become a primary data source in the natural sciences, economics,
archaeology, sustainability, national security & defence, and many other domains which
utilize geospatial intelligence.

Indeed, the wide variety of imagery sources and the vast amounts of data being collected
are now challenging our ability to manage, process, and derive useful insight from this
information.

Motivated by this, the primary objective of the course is to provide a
systematic introduction to computer-based processing of satellite imagery, focusing on
techniques for enhancing, processing, and extracting spatial information from imagery.

This course emphasizes the practical application of computer-based image processing
(for total beginners) using programming techniques capable of analyzing large quantities
of imagery data.

The tools used focus on Python with affiliated packages such as Rasterio, GeoPandas, OpenCV,
Matplotlib etc.


Learning Outcomes
=================

    1.	Understand practical computer programming techniques for processing satellite imagery.
    2.	Develop introductory Python script-based approaches for object detection and extraction.
    3.	Become proficient in using essential computer programming tools and software (Jupyter Notebooks, GitHub etc.).


Overview of Class Content
=========================
<p align="left">
  <img src="/syllabus/format/Slide2.PNG", width="800" />
</p>

Syllabus
========
<p align="left">
  <img src="/syllabus/format/Slide1.PNG", width="800" />
</p>


Getting Started
===============
A common approach for scientific computing is to use `Anaconda`, which not only provides
a package manager for Python, but also various virtual environment functions.

To install a conda environment capable of running the tutorials provided here,
you can utilize the following code:

    conda env create -f sia.yml

The `sia.yml` file represents an existing virtual environment with a variety of packages,
necessary for these tutorials (e.g., `geopandas`, `rasterio` etc.).

Alternatively, another installation approach is by creating
a new conda environment via the `requirements.txt` file, as follows:

    conda create --name sia --file requirements.txt


Acknowledgements
================
Thank you to [Planet Labs](https://www.planet.com/?gclid=Cj0KCQjwxveXBhDDARIsAI0Q0x35aKVZQdkpJ85xfat-DABZzCP4AO4xgqcIgMt1IeF0bVwNcAiFG9IaAjcSEALw_wcB)
for providing a research gift to support the online materials for this course, particularly Tanya Harrison, Chris Beck and Austin Stone. Moreover, thank you to George Mason University for the support provided, as this repository is the codebase associated with the satellite image processing class GGS416.


Current Contributors
====================
- Edward Oughton (eoughton [at] gmu.edu)
- Aiden Suganuma 

Past Contributors
========================================
- Mark Bossinger 
- Ulas Qazi 
