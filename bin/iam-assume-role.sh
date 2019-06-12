#!/bin/bash
#
# Assume the given role, and print out a set of environment variables
# for use with aws cli.
#
# To use:
#
#      $ eval $(./iam-assume-role.sh)
#

set -e

# Clear out existing AWS session environment, or the awscli call will fail
#unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_SECURITY_TOKEN
# Old ec2 tools use other env vars
#unset AWS_ACCESS_KEY AWS_SECRET_KEY AWS_DELEGATION_TOKEN

ROLE="${1:-SecurityMonkey}"
ACCOUNT="${2:-123456789}"
DURATION="${3:-900}"
NAME="${4:-$LOGNAME@`hostname -s`}"

# KST=access*K*ey, *S*ecretkey, session*T*oken
KST=(`aws sts assume-role --role-arn "arn:aws:iam::$ACCOUNT:role/$ROLE" \
                          --role-session-name "$NAME" \
                          --duration-seconds $DURATION \
                          --query '[Credentials.AccessKeyId,Credentials.SecretAccessKey,Credentials.SessionToken]' \
                          --output text`)

echo 'export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-eu-central-1}'
echo "export AWS_ACCESS_KEY_ID='${KST[0]}'"
echo "export AWS_ACCESS_KEY='${KST[0]}'"
echo "export AWS_SECRET_ACCESS_KEY='${KST[1]}'"
echo "export AWS_SECRET_KEY='${KST[1]}'"
echo "export AWS_SESSION_TOKEN='${KST[2]}'"      # older var seems to work the same way
echo "export AWS_SECURITY_TOKEN='${KST[2]}'"
echo "export AWS_DELEGATION_TOKEN='${KST[2]}'"
