const colors = {
  release: '#FEC945'
}

const translations = {
  ping: () => ({ text: 'Hello World!' }),
  release: payload => {
    const version = payload.release.tag_name
        , url = payload.release.html_url
        , user = payload.sender.login
        , userProfile = payload.sender.html_url
        , repo = payload.repository.full_name
        , repoURL = payload.repository.html_url;

    return {
      attachments: [
        {
          fallback: `${user} published ${version} of ${repo}.`,
          color: colors['release'],
          text: `A New Version of ${repo} was published!`,
          fields: [
            {
              title: 'Version',
              value: `<${url}|${version}>`,
              short: true
            },
            {
              title: 'Author',
              value: `<${userProfile}|@${user}>`,
              short: true
            },
            {
              title: 'Repo',
              value: `<${repoURL}|${repo}>`,
              short: true
            }
          ]
        }
      ]
    }
  },
  create: payload => {
    switch (payload.ref_type) {
      case 'tag':
        const release = {
          tag_name: payload.ref,
          html_url: `${payload.repository.html_url}/releases/tag/${payload.ref}`
        }

        return translations.release(Object.assign({}, payload, { release: release }));
      default:
        return null;
    }
  }
}

module.exports = translations;
