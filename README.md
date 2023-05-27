Vegetation Hydration Station : VHS

Have issue with photos, google photos baseUrl valid for only 1hr
want to do batchGetMediaItems at load (server)
need valid OAuth2 token
but atm, only storing OAuth2 token on client. Oops!

1. Home screen list plants

- Loading state
- Handle no plants
- Swipe between plants
  - https://www.youtube.com/watch?v=V0dfhBc2lj8
  - https://github.com/dominicarrojado/react-typescript-swiper
  - Using refs because it's more performant (i think). state is re-created on render, ref persists

2. Plant Card

- Image
- BackgroundColour based off plant image colour composition, find an API to do that
  - https://cloud.google.com/vision/docs/detecting-properties#vision_image_property_detection-nodejs
- Name
- Hydration state & date
- Button to mark plant as watered
- Button to edit plant details
- Link to Wikipedia?

4. Create/Update plant details

- Image Upload
  - https://developers.google.com/photos/library/guides/get-started
  - https://developers.google.com/photos/library/guides/upload-media
  - https://github.com/roopakv/google-photos/
- Set Name
- Set Hydration cycle
- Plant details from GoogleSheets so gerry can update it easily too
  - Could look at doing photos -> Google Photos too

5. Auth, login page, something
