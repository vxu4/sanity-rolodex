const jvContent = {
  name: 'jv-content',
  title: 'Jackie Vitale content',
  type: 'document',
  fields: [
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
      name: 'fullText',
      title: 'Full Text (full essay view)',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
}

export default jvContent // <-- Clean export at the bottom
