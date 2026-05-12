export const rolobeing = {
  name: 'person',
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
    // {
    //   name: 'slug',
    //   title: 'Image URL',
    //   type: 'slug',
    //   options: {
    //     source: 'name',
    //     maxLength: 96,
    //   },
    // },
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
