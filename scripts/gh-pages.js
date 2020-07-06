let ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        add: true,
        history: false,
        src: 'build/*',
        branch: 'gh-pages',
        repo: 'git@github.com:aioooi/tictactoe-svelte.git',
        user: {
            name: 'Chris',
            email: '66511731+aioooi@users.noreply.github.com'
        }
    },
    () => {
        console.log('deploy complete')
    }
)
