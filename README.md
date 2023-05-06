# Vercel serverless - Scraping Booking.com with @vercel/kv

## How it works ?

It scraps booking.com page and store the data inside @vercel/kv corresponding to the schemas that I need.

### API - Serverless

It will serve the data to a client.

### Request

Of course, it will take much time if we scrap every time, so for each request there's two endpoint.

#### Live scraping

It will scrap the data when the request is received.  
It's precise and accurate but are much more slower.

#### Cached

This one is more faster but it may have some delay between the real data.

### Planned ?

#### RDBSM

Currently, I'm just sticking to `@vercel/kv` (It's also an occasion for me to try it).  
But, in the future I may switch to my preferred DB provider `planescale` (MySQL then) paired with `prisma`

#### CRON

I plan to launch the live scraping punctually.

#### Product

I will launch this product for a specific client first. Then, let's see if we can grow it at a business level.

### API Folder structure will be revisited

