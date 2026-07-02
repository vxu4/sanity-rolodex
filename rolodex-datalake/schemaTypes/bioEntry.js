const bioEntry = {
  name: 'bioEntry',
  title: 'Bio / Story Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Story Title',
      type: 'string',
    },

    {
      name: 'peopleInvolved',
      title: 'People in this Story',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'rolobeing'}],
        },
      ],
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
    {
      name: 'content',
      title: 'The Story /  Content',
      type: 'text',
    },
  ],
}

export default bioEntry // <-- Clean export at the bottom
