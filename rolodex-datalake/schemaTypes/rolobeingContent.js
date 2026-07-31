const rolobeingContent = {
  //TODO: rename this name below, but it will break the data (sanity will treat as new)
  name: 'jv-content',
  title: 'Rolobeing content',
  type: 'document',
  fields: [
    // =================================================
    // IDENTITY (who, what topics, etc. is involved in project)
    // =================================================
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'initials',
      title: 'Initials',
      type: 'string',
    },
    {
      name: 'prompt',
      title: 'Prompt',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },

    {
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      description: 'Used for navigation + UI accents',
    },
    // =================================================
    // ROUTING (how the site navigates to them)
    // =================================================
    {
      name: 'slug',
      title: 'Content Page Slug',
      type: 'slug',
      options: {
        source: 'initials',
        maxLength: 96,
      },
    },
    {
      name: 'bioSlug',
      title: 'Bio Page Slug',
      type: 'slug',
      description: 'Optional separate bio route',
    },
    // =================================================
    // CONTENT (interactive / generative page content)
    // =================================================
    {
      name: 'curatorialText',
      title: 'Curatorial Text (to introduce/frame the piece)',
      type: 'string',
    },
    {
      name: 'contributorNames',
      title: 'Contributor names (e.g. artist/author, collaborators, editor, curation, design',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'dateList',
      title: 'Dates (important dates in the creation/process/publishing of the piece)',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'textFragments',
      title: 'Text Fragments (for interactive view)',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Allows you to crop the photo inside the Studio
          },
        },
      ],
    },
    {
      name: 'audio',
      title: 'Audio files',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'audio/*',
          },
        },
      ],
    },
    {
      name: 'video',
      title: 'Video files',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    },
    {
      name: 'fullText',
      title: 'Full Text (full essay view)',
      type: 'text',
    },
  ],
}

export default rolobeingContent // <-- Clean export at the bottom
