module.exports = {
  release: payload => {
    const version = payload.release.tag_name
        , title = payload.release.name
        , titleLink = payload.release.html_url
        , desc = payload.release.body
        , user = payload.release.author.login
        , repo = payload.repository.name;

    return {
      attachments: [
        {
          fallback: `${user} published ${version} of ${repo}.`,
          pretext: `${user} published a new version of ${repo}.`,
          color: '#FEC945',
          title: version,
          title_link: titleLink,
          text: desc
        }
      ]
    }
  }
}
