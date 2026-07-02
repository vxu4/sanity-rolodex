const rolobeing = {
  name: 'rolobeing',
  title: 'Rolobeing Page',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'initals',
      title: 'Initials',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Short line',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL Extension)',
      type: 'slug',
      description: 'Click "Generate" to automatically create a unique link ID for this person.',
      options: {
        source: 'initals', // Tells Sanity to look at the "name" field to create the slug
        maxLength: 96,
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
    },
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the photo inside the Studio
      },
    },
  ],
}

export default rolobeing // <-- Clean export at the bottom
