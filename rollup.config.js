import 'dotenv/config';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
//import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy-watch'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
    },
    plugins: [
        replace({
            PIZZLY_URL: JSON.stringify(process.env.PIZZLY_URL),
        }),
        nodeResolve(),
        //commonjs(),
        copy({
            watch: 'public',
            targets: [
                { src: 'public/**/*', dest: 'dist/' }
            ]
        }),
        serve('dist'), // index.html should be in root of project
        livereload('dist'),
    ]
};
