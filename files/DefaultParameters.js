var fs = require('fs');

module.exports = function(env) {

    var customJson = {
      "opsworks_java": {
      "jvm_version": 8,
      "java_app_server_version": 8
      },
      "custom_env": {
        "gigya-qa": {
          "type": "java",
          "jar": "B2BPlatformServices-1.0.0.RELEASE.jar"
        }
      }
    }

    var customJsonString = JSON.stringify(customJson) ;

    var settings = {
        defaultStackParams: {
            Region: 'us-east-1',
            ConfigurationManager: {
                Name: 'Chef',
                Version: '11.10'
            },
            DefaultRootDeviceType: 'ebs',
            DefaultOs: 'Amazon Linux 2017.09',
            UseCustomCookbooks: true,
            CustomCookbooksSource: {
                Type: 'git',
                Url: 'https://github.com/mpalkhade/ChefRepo.git'
            },
            UseOpsworksSecurityGroups: true,
            DefaultSshKeyName: 'sapana_aws_new'
        },

        /* Layer Default Settings */
        defaultLayerParams: {
            Type: 'java-app',
            CustomRecipes: {
                Deploy: [ 'java::deploy' ]
            },
            AutoAssignElasticIps: false,
            AutoAssignPublicIps: true,
            EnableAutoHealing: true,
            InstallUpdatesOnBoot: true,
            UseEbsOptimizedInstances: false,
            CustomJson: customJsonString
        },

        /* Yogesh - App Default Settings */
        defaultAppParams: {
            Type: 'java',
            AppSource: {
              Type: 'git',
              Url: 'https://github.com/mpalkhade/Opsworks.git',
              Username: 'mpalkhade'
            },
            EnableSsl: false
        },

        /* Default Instance Settings */
        defaultInstanceParams: {
            Architecture: 'x86_64'
        }
    };

    switch (env) {
        case 'qa':
            settings.defaultStackParams.DefaultInstanceProfileArn = 'arn:aws:iam::123208278418:instance-profile/aws-opsworks-ec2-role';
            settings.defaultStackParams.ServiceRoleArn = 'arn:aws:iam::123208278418:role/aws-opsworks-service-role';
            settings.defaultStackParams.DefaultSubnetId = 'subnet-75c42e29';
            settings.defaultStackParams.VpcId = 'vpc-a65800dd';
            settings.defaultLayerParams.CustomSecurityGroupIds = ['sg-f3d038bb'];
            break;
    }

    return settings;
};
