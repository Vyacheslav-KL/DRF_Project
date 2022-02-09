import graphene
from graphene_django import DjangoObjectType
from todoapp.models import ToDo, Project
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_todos(self, info):
        return ToDo.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None


class TodoMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String()
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = ToDo.objects.get(pk=id)
        todo.text = text
        todo.save()
        return TodoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
