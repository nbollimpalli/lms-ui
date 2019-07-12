import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta : Meta) { }

  generateTags(config)
  {
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
    this.meta.addTag({ name: 'twitter:title', content: config.title });
    this.meta.addTag({ name: 'twitter:description', content: config.desc });
    this.meta.addTag({ name: 'twitter:image', content: config.image_url });

    this.meta.addTag({ name: 'og:title', content: config.title });
    this.meta.addTag({ name: 'og:site_name', content: 'Algovent' });
    this.meta.addTag({ name: 'og:description', content: config.desc });
    this.meta.addTag({ name: 'og:type', content: 'article' });
    this.meta.addTag({ name: 'og:image', content: config.image_url });
    this.meta.addTag({ name: 'og:url', content: config.content_url });
  }

}
