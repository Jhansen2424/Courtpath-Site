# SEO technical fixes (branch: seo-technical-fixes)

From the Oct 2, 2026 SEO audit of courtpath.com.

## Done in this branch
- [x] 308 redirects for 18 legacy WordPress URLs (/about-us, /tutorial-videos, /product/*, /login, …) in `next.config.ts`
- [x] `robots.txt` and `sitemap.xml` (`src/app/robots.ts`, `src/app/sitemap.ts`)
- [x] `metadataBase`, canonical URLs, Open Graph + Twitter tags on every public page (`pageMetadata` in `src/lib/site.ts`)
- [x] Default share image (`src/app/opengraph-image.tsx`)
- [x] Organization JSON-LD in the root layout (address, phone, logo, LinkedIn)
- [x] Utah-focused titles and descriptions for home, pricing, about, tutorials, contact
- [x] noindex on checkout and signup pages (dashboard already had it)
- [x] Login URL centralized in `APP_LOGIN_URL` — one-line swap when a branded subdomain exists
- [x] Dead `support.courtpath.com` links (contact, tutorials hero, tutorial videos) now point to /tutorials or /contact
- [x] Footer: FAQ links to /pricing#faq; removed Affiliates/Privacy/Terms links that pointed at /about or /contact; removed the search box that did nothing
- [x] Contact map: real embed of the office address instead of a placeholder place ID
- [x] Hero: "Certified by the Utah State Courts … since 2019," linked to the courts' provider list

## Needs a decision or access (not code)
- [ ] Vercel: make the courtpath.com → www redirect permanent (currently 307)
- [ ] DNS: create app.courtpath.com for the app, then update `APP_LOGIN_URL`
- [ ] Privacy policy and terms of service pages (legal copy needed)
- [ ] Pricing FAQ copy is template text: "14-day free trial for our Professional plan," "Enterprise customers," "Save 15% annually." Rewrite before adding FAQPage schema
- [ ] Claims: "Trusted by 500+ Law Firms," "50K+ Filings," "99.9% uptime," 4.9/5 rating, the About-page testimonials, "Live Since 2015." `src/data/stats.ts` shows 702 total users / 78 active filers
- [ ] Official phone number: site uses (801) 797-3119, the courts' provider list shows 855-262-2748
- [ ] Google Search Console + GA4, submit sitemap after deploy

## Review
- `npm run build` passes; checked titles, canonicals, robots, OG/Twitter images in `.next/server/app/*.html`, and redirect status codes (308) in `.next/routes-manifest.json`.

# Blog (branch: blog-initial-posts)

## Done
- [x] /blog index and /blog/[slug] post template (Article, BreadcrumbList and FAQPage JSON-LD; sources; disclaimer; related posts)
- [x] Draft workflow: `status: "draft"` posts render at their URL with a banner but are noindexed and left out of the blog index, sitemap and footer link
- [x] Post: How to E-File a New Civil Case in Utah District Court (calendar: week of Oct 12)
- [x] Post: E-Service Under URCP 5: When E-Filing Counts as Service in Utah (calendar: week of Oct 19)

## To publish a post
1. An attorney reviews it against the linked sources. Set `reviewedBy` and update `updatedAt`.
2. Set `status: "published"` and `publishedAt`.
3. The post then appears on /blog, in the sitemap, and the footer gains a Blog link.

## Second pass (Oct 2, 2026)
- [x] Every rule cite re-checked against current rule text pulled from legacy.utcourts.gov (URCP 3, 4, 5, 6, 7, 10, 12, 26, 75, 76; UCJA 4-503, 4-202.09) plus the courts' Business Rules, eFiling Standards and training PDFs
- [x] Independent fact-check pass; fixed one error (4-503 date), one internal contradiction (emailing discovery), and added missing qualifiers
- [x] Added: state vs. federal court distinction, civil cover sheet (URCP 10(a)(4)), summons contents, redaction rule, acceptance of service, discovery and proposed-order service gaps, defaults, Rule 6(d)

## Open
- [x] Attorney review (Oct 2026): "all correct." Requested change applied: post 2 now leads with represented (e-filing serves counsel, no further service) vs. self-represented (no e-filing access; serve another way and include a certificate of service); post 1 Step 7 says the same
- [ ] Reviewer's name for the "Reviewed by" byline (`reviewedBy`), then publish per the steps above
- [ ] Core page /utah-efiling (the plan's hub); posts should link to it once it exists
