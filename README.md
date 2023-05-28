Vegetation Hydration Station : VHS

todos:

1. fix general layout display
1. image colour composition

- https://cloud.google.com/vision/docs/detecting-properties#vision_image_property_detection-nodejs

1. testing
1. Tidy up script files, make some reusable methods
1. storybook ? or delete it

Using ReactQuery / QueryClient as a global store for Photo Urls & a way to load them. It's gr8

1. Home screen list plants

- [x] Swipe between plants
  - https://www.youtube.com/watch?v=V0dfhBc2lj8
  - https://github.com/dominicarrojado/react-typescript-swiper
  - Using refs because it's more performant (i think). state is re-created on render, ref persists

2. Plant Card

- Image
- BackgroundColour based off plant image colour composition, find an API to do that
  - https://cloud.google.com/vision/docs/detecting-properties#vision_image_property_detection-nodejs
- Name
- [x] Hydration state & date
- [x] Button to mark plant as watered
- [x] Button to edit plant details
- ~~Link to Wikipedia?~~

4. Create/Update plant details

- [x] Image Upload

  - https://developers.google.com/photos/library/guides/get-started
  - https://developers.google.com/photos/library/guides/upload-media
  - https://github.com/roopakv/google-photos/

- Admin: CRUD plants
  - Set Name
  - Set Hydration cycle
- [x] Plant details from GoogleSheets so gerry can update it easily too
  - [x] Could look at doing photos -> Google Photos too

5. Auth

- [x] login page, something
