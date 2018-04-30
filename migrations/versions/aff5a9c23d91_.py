"""empty message

Revision ID: aff5a9c23d91
Revises: 3ea2da1e0ccb
Create Date: 2018-04-30 01:16:22.191403

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'aff5a9c23d91'
down_revision = '3ea2da1e0ccb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('post_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('photo', sa.String(length=255), nullable=True),
    sa.Column('caption', sa.String(length=80), nullable=True),
    sa.Column('created_on', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('first_name', sa.String(length=80), nullable=True),
    sa.Column('last_name', sa.String(length=80), nullable=True),
    sa.Column('gender', sa.String(length=80), nullable=True),
    sa.Column('email', sa.String(length=80), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('biography', sa.String(length=255), nullable=True),
    sa.Column('profile_photo', sa.String(length=255), nullable=True),
    sa.Column('joined_on', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('follows')
    op.drop_table('posts')
    op.drop_table('users')
    op.drop_table('likes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('userID', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('postID', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name=u'likes_pkey')
    )
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('firstname', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('lastname', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('username', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('password', sa.VARCHAR(length=250), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('location', sa.VARCHAR(length=255), autoincrement=False, nullable=True),
    sa.Column('biography', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('proPhoto', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('joined_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name=u'users_pkey'),
    sa.UniqueConstraint('username', name=u'users_username_key')
    )
    op.create_table('posts',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('userID', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('photo', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('caption', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('created_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name=u'posts_pkey')
    )
    op.create_table('follows',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('userID', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('followerID', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name=u'follows_pkey')
    )
    op.drop_table('user_profiles')
    op.drop_table('Posts')
    op.drop_table('Likes')
    op.drop_table('Follows')
    # ### end Alembic commands ###