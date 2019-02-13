#! groovy
import jenkins.model.*

properties([[$class: 'BuildDiscarderProperty',
             strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '',
                        daysToKeepStr: '', numToKeepStr: '5']]])

node {
  def project = 'navikt'
  def application = 'melosys-schema'
  def applicationLogger = 'melosys-frontendlogger'
  def webMockDir = '/var/lib/jenkins/melosys-web-mock'
  // Nexus
  def nexusHost = 'http://maven.adeo.no/nexus/content/repositories/m2internal'
  // def artifactPath = "/no/nav/melosys/${application}/maven-metadata.xml"
  // curl -s http://maven.adeo.no/nexus/content/repositories/m2internal/no/nav/melosys/melosys-web-mock/maven-metadata.xml | xmllint --xpath 'string((//metadata/versioning/versions/version)[last()])' -
  def schemaZipFile, frontendLoggerZip
  def repositoryId

  /* metadata */
  def semVer, buildVersion
  def commitHash, commitHashShort, commitUrl, committer, lsRemote
  def scmVars

  /* tools */
  def NODE_JS_HOME = tool "node-10.10.0" // => "installation directory" = "/opt/node"
  echo "${NODE_JS_HOME}"
  def node = "${NODE_JS_HOME}/bin/node"
  def npm = "${NODE_JS_HOME}/bin/npm"

  // Delete whole workspace before starting the build, so that the 'git clone' command below
  // doesn't fail due to directory not being empty
  cleanWs()

  stage('Checkout') {
    echo('Checkout from GitHub ...')
    scmVars = checkout scm
    scmVars.each { print it }
  }

  stage('Initialize scm') {
    commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
    echo("commitHash=${commitHash}")
    commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
    commitUrl = "https://github.com/${project}/${application}/commit/${commitHash}"
    // gets the person who committed last as "Surname, First name"
    committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
    lsRemote = sh(script: "git ls-remote origin 'pull/*/head'", returnStdout: true).trim()
    echo("commitHash=${lsRemote}")
    lsRemote.eachLine {
      println it.split()
    }

    semVer = sh(returnStdout: true, script: "node -pe \"require('./package.json').version\"").trim()
    echo("package.json semVer=${semVer}")
    echo("")
    if (scmVars.GIT_BRANCH.equalsIgnoreCase("develop")) {
      buildVersion = "${semVer}-${BUILD_NUMBER}"
    }
    else if (scmVars.GIT_BRANCH.startsWith("PR-")) {
      def snapshotVersion = scmVars.GIT_BRANCH.toUpperCase().replaceAll("[^A-Z0-9]", "-")
      buildVersion = "${semVer}-${snapshotVersion}-SNAPSHOT"
    }
    else {
      buildVersion = "${semVer}-SNAPSHOT"
    }
    echo("buildVersion=${buildVersion}")
  }

  stage('npm install ') {
    echo('Step: npm install package depenencies')
    sh "${node} -v"
    sh "${npm} -v"
    sh "${npm} config ls"
    sh "${npm} install"
  }

  stage('Build Zip artifacts') {
    echo('Build Zip artifacts')

    schemaZipFile = "${application}-${buildVersion}.jar"
    echo("schemaZipFile:${schemaZipFile}")
    sh "cd scripts/; zip -r ../$schemaZipFile ./schema/*; cd .."

    frontendLoggerZip = "frontendlogger-${buildVersion}.zip"
    echo("frontendLoggerZip:${frontendLoggerZip}")
    sh "cd static/; zip ../${frontendLoggerZip} *.js; cd .."
  }

  stage('Copy Zip archive to pickup') {
    sh "rm -rf $webMockDir/*" // Clean the content, don't remove top folder
    sh "cp ${schemaZipFile} $webMockDir"
  }

  stage('Deploy Schema Zip archive to Nexus') {
    if (scmVars.GIT_BRANCH.equalsIgnoreCase("develop")) {
      repositoryId = "m2internal"
    }
    else {
      repositoryId = "m2snapshot"
    }
    echo("repositoryId:${repositoryId}")
    configFileProvider(
      [configFile(fileId: 'navMavenSettings', variable: 'MAVEN_SETTINGS')]) {
      sh """
     	  	mvn --settings ${MAVEN_SETTINGS} deploy:deploy-file -Dfile=${schemaZipFile} -DartifactId=${application} \
	            -DgroupId=no.nav.melosys -Dversion=${buildVersion} \
	 	        -Ddescription='Melosys-web-mock JSON data and schema.' \
		        -DrepositoryId=${repositoryId} -Durl=http://maven.adeo.no/nexus/content/repositories/${repositoryId}
        """
    }
  }
  stage('Deploy frontendlogger Zip archive til Nexus') {
    configFileProvider(
      [configFile(fileId: 'navMavenSettings', variable: 'MAVEN_SETTINGS')]) {
      sh """
     	  	mvn --settings ${MAVEN_SETTINGS} deploy:deploy-file -Dfile=${frontendLoggerZip} -DartifactId=${applicationLogger} \
	            -DgroupId=no.nav.melosys -Dversion=${buildVersion} \
	 	        -Ddescription='Melosys-frontendlogger.' \
		        -DrepositoryId=${repositoryId} -Durl=http://maven.adeo.no/nexus/content/repositories/${repositoryId}
        """
    }
  }
}
