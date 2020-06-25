let ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'git@github.com:aioooi/tictactoe_svelte.git',
        user: {
            name: 'Chris',
            email: '66511731+aioooi@users.noreply.github.com'
        }
    },
    () => {
        console.log('deploy complete')
    }
)
