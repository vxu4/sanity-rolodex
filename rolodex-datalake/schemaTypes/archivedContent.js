const archivedContent = {
  //TODO: rename this name below, but it will break the data (sanity will treat as new)
  name: 'archivedContent',
  title: 'MZYVB Archived content',
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
      name: 'date',
      title: 'Date',
      type: 'string',
      description: '(month dd, yyyy)'
    },
    {
      name: 'zodiac',
      title: 'Zodiac',
      type: 'string',
      description: '(<i>zodiac</i>: MM dd - MM dd)'
    },
    {
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      description: 'Used for navigation + UI accents, (#hexcode)',
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
    // =================================================
    // Project Content
    // =================================================
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    {
      name: 'image',
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
      name: 'caption',
      title: 'Caption',
      type: 'array',
      of: [
        {
          type: 'string',
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
      name: 'mapping',
      title: 'Mapping of how different formats are ordered with each other. Eg. 2 text, 1 image, 1 audio, etc.',
      type: 'array',
      of: [
        { type: 'string' },
        { type: 'number' }
      ],
    },
    {
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
}

export default archivedContent // <-- Clean export at the bottom
