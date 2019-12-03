importScripts('lg2.js');

Module.onRuntimeInitialized = () => {
    const lg = Module;

    FS.mkdir('/working');
    FS.mount(MEMFS, { }, '/working');
    FS.chdir('/working');    

    FS.writeFile('/home/web_user/.gitconfig', '[user]\n' +
                'name = Test User\n' +
                'email = test@example.com');

    // create an empty git repository and create some commits

    lg.callMain(['init','testrepo']);
    FS.chdir('testrepo');
    FS.writeFile('test.txt', 'hello');
    
    lg.callMain(['add', '--verbose', 'test.txt']);
    lg.callMain(['commit','-m','test 123']);
    
    lg.callMain(['log']);
    lg.callMain(['status']);

    
    lg.callMain(['status']);

    FS.writeFile('test.txt', 'second revision');

    lg.callMain(['add', 'test.txt']);

    lg.callMain(['status']);
    lg.callMain(['commit','-m','test again']);

    lg.callMain(['status']);

    lg.callMain(['log']);

    FS.chdir('..');

    // clone a repository from github
    lg.callMain(['clone','http://localhost:5000/torch2424/made-with-webassembly.git','clonedtest']);
    
    FS.chdir('clonedtest');
    console.log(FS.readdir('.'));
    lg.callMain(['log']);
    
};