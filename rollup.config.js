import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import livereload from 'rollup-plugin-livereload';
import { terser } from '@rollup/plugin-terser'; // Correctly import the Terser plugin from @rollup
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

const production = !process.env.ROLLUP_WATCH;

dotenv.config();

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env': JSON.stringify({
        ...process.env,
      }),
    }),
    svelte({
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css');
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    json(),
    !production && serve(),
    !production && livereload('public'),
    production && terser() // Only use Terser in production mode
  ],
  watch: {
    clearScreen: false
  }
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;
        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
