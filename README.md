A Gentle Introduction to Satellite Image Processing
===================================================
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/edwardoughton/satellite-image-analysis/HEAD)

Welcome to this introductory course on `Satellite Image Analysis`!

Satellite imagery has become a primary data source in the natural sciences, economics,
archaeology, sustainability, and many other domains which utilize geospatial intelligence.

Indeed, the wide variety of imagery sources and the vast amounts of data being collected
are now challenging our ability to manage, process, and derive useful insight from this
information.

Motivated by this, the primary objective of the course is to provide a
systematic introduction to computer-based processing of satellite imagery techniques
for enhancing, processing, and extracting spatial information from imagery.

This course emphasizes the practical application of computer-based image processing
(for total beginners) using programming techniques capable of analyzing large quantities
of imagery data.

The tools used focus on Python with affiliated packages such as Rasterio, GeoPandas, OpenCV, Matplotlib etc.

Learning Outcomes
=================

    1. Understand practical computer programming techniques for processing satellite imagery.
    2. Develop introductory Python-based approaches for object detection and extraction.

Syllabus
========
<p align="left">
  <img src="/syllabus/format_v3.png", width="800" />
</p>


Clean Installation via Conda
============================

The recommended way to use the course materials is via conda, which handles packages and
virtual environments, along with the conda-forge channel which has a host of pre-built
libraries and packages.

Create a conda environment called `sia` (for Satellite Image Analysis):

    conda create -n sia

It's also handy to install `jupyter`:

    conda install jupyter notebook

You will need a bunch of other packages, such as `rasterio`, `geopandas` and `matplotlib`:

    conda install rasterio geopandas matplotlib

If you need to uninstall the environment, use the following:

    conda remove --name sia --all

Cloning and Installing Package Dependencies
===========================================

Alternatively, you can use the `environment.yml` file to install dependencies.

Clone this repository using GitHub Desktop or on the command line:

    git clone https://github.com/edwardoughton/satellite-image-analysis.git

Then navigate into the project directory:

    cd satellite-image-analysis

Finally, create and activate a conda environment with all required package dependencies:

    conda env create -f environment.yml
    conda activate sia


Acknowledgements
================

This repository is the codebase associated with the satellite image processing class
supported and delivered by George Mason University (GGS416).

Contributors
============
- Edward Oughton (eoughton [at] gmu.edu)
- Osoro Ogutu Bonfacee (bosoro [at] gmu.edu)
- Mirza Waleed (mirzawaleed197 [at] gmail.com)
- Bradley A. Gay (bgay2 [at] gmu.edu)
